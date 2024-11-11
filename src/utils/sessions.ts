import { TRPCError } from "@trpc/server";
import moment from "moment";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "./trpc";

// Mocked Data
const mockRooms = [
  { id: "room-1", title: "Room 1", content: "Discussion about treatment.", userCreatedBy: "1", userCreatedFor: ["2"], time: new Date(), duration: 60, zoomSessionsIds: [] },
  { id: "room-2", title: "Room 2", content: "Session on patient care.", userCreatedBy: "1", userCreatedFor: ["2"], time: new Date(), duration: 30, zoomSessionsIds: [] },
];

// Mock session user (simulate user session)
const mockSession = { user: { id: "1", role: "doctor" } };

// Mocked database simulation
const mockDatabase = {
  room: {
    create: ({ data }: any) => {
      const newRoom = { id: `room-${mockRooms.length + 1}`, ...data };
      mockRooms.push(newRoom);
      return newRoom;
    },
    findMany: ({ where, orderBy }: any) => {
      const filteredRooms = mockRooms.filter(room => {
        if (where.time.gte) {
          return new Date(room.time) >= where.time.gte;
        }
        return true;
      });
      return filteredRooms.sort((a, b) => a.time.getTime() - b.time.getTime());
    },
    findUnique: ({ where }: any) => mockRooms.find(room => room.id === where.id),
    update: ({ where, data }: any) => {
      const roomIndex = mockRooms.findIndex(room => room.id === where.id);
      if (roomIndex !== -1) {
        mockRooms[roomIndex] = { ...mockRooms[roomIndex], ...data };
        return mockRooms[roomIndex];
      }
      throw new TRPCError({ code: "NOT_FOUND", message: "Room not found" });
    },
    delete: ({ where }: any) => {
      const roomIndex = mockRooms.findIndex(room => room.id === where.id);
      if (roomIndex !== -1) {
        mockRooms.splice(roomIndex, 1);
        return true;
      }
      throw new TRPCError({ code: "NOT_FOUND", message: "Room not found" });
    },
  },
};

// Session Router
export const sessionRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().refine((title) => title.length > 2, { message: "Title must be at least three characters" }),
        content: z.string().refine((content) => content.length > 2, { message: "Description must be at least three characters" }),
        IDs: z.array(z.string()).min(1).refine((IDs) => IDs.length > 0, { message: "Ensure you've invited someone by clicking the 'add' button" }),
        time: z.date().refine((date) => date.getTime() > Date.now(), { message: "Appointment time must be in the future" }),
        duration: z.number().refine((duration) => duration > 0, { message: "Duration must be greater than 0" }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { title, content, IDs, time, duration } = input;

      if (!ctx.session || !ctx.session.user) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "User must be authenticated" });
      }

      // Simulate creating a room in the mock database
      const newRoom = mockDatabase.room.create({
        data: {
          title: title.trim(),
          content: content.trim(),
          userCreatedBy: ctx.session.user.id,
          userCreatedFor: IDs,
          time,
          duration,
          zoomSessionsIds: [],
        },
      });
      return newRoom;
    }),

  getUpcoming: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session || !ctx.session.user) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "User must be authenticated" });
    }

    const time = moment().utc().toDate();
    const rooms = await mockDatabase.room.findMany({
      where: { time: { gte: time } },
    });

    return rooms;
  }),

  getCreatedUpcoming: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session || !ctx.session.user) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "User must be authenticated" });
    }

    const time = moment().utc().toDate();
    const rooms = await mockDatabase.room.findMany({
      where: { userCreatedBy: ctx.session.user.id, time: { gte: time } },
    });

    return rooms;
  }),

  getInvitedUpcoming: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session || !ctx.session.user) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "User must be authenticated" });
    }

    const time = moment().utc().toDate();
    return mockDatabase.room.findMany({
      where: {
        time: { gte: time },
        userCreatedFor: { some: { id: ctx.session.user.id } },
      },
    });
  }),

  getById: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    if (!ctx.session || !ctx.session.user) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "User must be authenticated" });
    }

    const room = await mockDatabase.room.findUnique({ where: { id: input.id } });
    if (!room) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Room not found" });
    }

    // Simulate permission check
    if (room.userCreatedBy === ctx.session.user.id || room.userCreatedFor.includes(ctx.session.user.id)) {
      return room;
    }

    throw new TRPCError({ code: "FORBIDDEN", message: "You do not have permission to access this room" });
  }),

  delete: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
    if (!ctx.session || !ctx.session.user) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "User must be authenticated" });
    }

    const room = await mockDatabase.room.findUnique({ where: { id: input.id } });
    if (!room) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Room not found" });
    }

    if (room.userCreatedBy !== ctx.session.user.id) {
      throw new TRPCError({ code: "FORBIDDEN", message: "You are not allowed to delete this room" });
    }

    await mockDatabase.room.delete({ where: { id: input.id } });
    return true;
  }),
});
