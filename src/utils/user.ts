import { TRPCError, type inferRouterOutputs } from "@trpc/server";
import moment from "moment";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "./trpc";

// Mock environment variables for testing
const env = { NEXT_PUBLIC_TESTMODE: "TESTING" };

// Mock database operations
const mockDb = {
  user: {
    findMany: async (input: any) => {
      // Mock user search by name, returns some users
      if (input.where.name.contains === "John") {
        return [
          { id: "1", name: "John Doe", role: "doctor" },
          { id: "2", name: "John Smith", role: "patient" },
        ];
      }
      return []; // No users found
    },
    findUnique: async (input: any) => {
      if (input.where.id === "valid-user-id") {
        return { id: "valid-user-id", name: "Alice", role: "doctor" };
      }
      return null; // User not found
    },
    update: async (input: any) => {
      if (input.where.id === "valid-user-id") {
        return { id: "valid-user-id", name: "Alice", role: input.data.role };
      }
      return null; // Simulate user not found
    },
  },
  patient: {
    findUnique: async (input: any) => {
      if (input.where.userId === "valid-user-id") {
        return {
          id: "patient-id",
          userId: "valid-user-id",
          height: 170,
          weight: 70,
          bloodType: "O+",
          allergies: "Peanuts",
          medications: "None",
          DOB: new Date("1990-01-01"),
          User: { id: "valid-user-id", name: "Alice", role: "doctor" },
        };
      }
      return null; // Patient not found
    },
    create: async (data: any) => {
      return { id: "new-patient-id", ...data.data }; // Mock patient creation
    },
    update: async (data: any) => {
      return { id: "updated-patient-id", ...data.data }; // Mock patient update
    },
  },
  doctor: {
    create: async (data: any) => {
      return { id: "new-doctor-id", ...data.data }; // Mock doctor creation
    },
  },
  room: {
    create: async (data: any) => {
      return { id: "room-id", ...data.data }; // Mock room creation
    },
  },
  file: {
    create: async (data: any) => {
      return { id: "file-id", ...data.data }; // Mock file creation
    },
  },
};

// Mock session for protected procedures
const mockSession = {
  user: { id: "valid-user-id", role: "doctor" },
};

// The mocked router
export const userRouter = createTRPCRouter({
  searchUserByName: protectedProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await mockDb.user.findMany({
        where: { name: { contains: input.name, mode: "insensitive" } },
        select: { id: true, name: true, role: true },
      });
      if (user) {
        return user;
      } else {
        return [];
      }
    }),

  getUserById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await mockDb.user.findUnique({ where: { id: input.id }, select: { id: true, name: true, role: true } });
      if (user) {
        return user;
      } else {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
    }),

  getPatientDetails: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      if (ctx.session.user.role !== "doctor" && ctx.session.user.id !== input.userId) throw new TRPCError({ code: "FORBIDDEN" });
      const patient = await mockDb.patient.findUnique({
        where: { userId: input.userId },
        include: { User: { select: { id: true, name: true, role: true } } },
      });
      if (patient) {
        return patient;
      } else {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Patient not found",
        });
      }
    }),

  setPatientDetails: protectedProcedure
    .input(z.object({
      height: z.number(),
      weight: z.number(),
      bloodType: z.string(),
      allergies: z.string(),
      medications: z.string(),
      DOB: z.date(),
      userId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.id !== input.userId) throw new TRPCError({ code: "FORBIDDEN" });
      const patient = await mockDb.patient.update({
        where: { userId: ctx.session.user.id },
        data: {
          height: input.height,
          weight: input.weight,
          bloodType: input.bloodType,
          allergies: input.allergies,
          medications: input.medications,
          DOB: input.DOB,
        },
      });
      if (patient) {
        return patient;
      } else {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Patient not found",
        });
      }
    }),

  getDoctors: protectedProcedure.input(z.object({ name: z.string().nullable() })).query(async ({ ctx, input }) => {
    const doctors = await mockDb.user.findMany({
      where: {
        name: {
          contains: input.name ? input.name : "",
          mode: "insensitive",
        },
        role: "doctor",
      },
      take: 20,
      include: { Doctor: true },
    });
    const doctorWithoutEmail = doctors.map((d) => ({ ...d, email: null, image: null }));
    return doctorWithoutEmail;
  }),

  getPatients: protectedProcedure.input(z.object({ name: z.string().nullable() })).query(async ({ ctx, input }) => {
    const patients = await mockDb.user.findMany({
      where: {
        name: {
          contains: input.name ? input.name : "",
          mode: "insensitive",
        },
        role: "patient",
      },
      take: 20,
      include: { Patient: true },
    });
    const patientsWithoutEmail = patients.map((p) => ({ ...p, email: null, image: null }));
    return patientsWithoutEmail;
  }),

  setDoctor: protectedProcedure.input(z.object({
    department: z.string(),
    position: z.string(),
  })).mutation(async ({ ctx, input }) => {
    const doctor = await mockDb.doctor.create({
      data: {
        userId: ctx.session.user.id,
        department: input.department,
        position: input.position,
      },
    });
    const user = await mockDb.user.update({
      where: { id: ctx.session.user.id },
      data: { role: 'doctor', doctorId: doctor.id },
    });
    if (user) {
      return { user, doctor };
    } else {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }
  }),

  setPatient: protectedProcedure.input(z.object({
    height: z.number(),
    weight: z.number(),
    bloodType: z.string(),
    allergies: z.string(),
    medications: z.string(),
    DOB: z.date(),
  })).mutation(async ({ ctx, input }) => {
    const patient = await mockDb.patient.create({
      data: {
        userId: ctx.session.user.id,
        height: input.height,
        weight: input.weight,
        bloodType: input.bloodType,
        allergies: input.allergies,
        medications: input.medications,
        DOB: input.DOB,
      },
    });
    const user = await mockDb.user.update({
      where: { id: ctx.session.user.id },
      data: { role: 'patient', patientId: patient.id },
    });
    if (user) {
      return { user, patient };
    } else {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }
  }),

  setDemo: protectedProcedure.input(z.object({
    department: z.string(),
    position: z.string(),
    height: z.number(),
    weight: z.number(),
    bloodType: z.string(),
    allergies: z.string(),
    medications: z.string(),
    DOB: z.date(),
  })).mutation(async ({ ctx, input }) => {
    if (env.NEXT_PUBLIC_TESTMODE !== "TESTING") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Demo mode is disabled",
      });
    }
    const doctor = await mockDb.doctor.create({
      data: {
        userId: ctx.session.user.id,
        department: input.department,
        position: input.position,
      },
    });
    const patient = await mockDb.patient.create({
      data: {
        userId: ctx.session.user.id,
        height: input.height,
        weight: input.weight,
        bloodType: input.bloodType,
        allergies: input.allergies,
        medications: input.medications,
        DOB: input.DOB,
      },
    });
    const user = await mockDb.user.update({
      where: { id: ctx.session.user.id },
      data: { role: 'doctor', patientId: patient.id, doctorId: doctor.id },
    });
    if (user) {
      await mockDb.room.create({
        data: {
          title: "Demo Session",
          content: "This is a demo session",
          User_CreatedBy: { connect: { id: ctx.session.user.id } },
          duration: 1,
          time: moment().utc().add(10, 'day').toDate(),
          User_CreatedFor: { connect: { email: 'bob@test.com' } },
        },
      });
      await mockDb.file.create({
        data: {
          name: "clteivw2g000ducoqlixsjqcg_26311_next.jpg",
          type: "application/pdf",
          createdAt: new Date(),
          updatedAt: new Date(),
          patientId: patient.id,
        },
      });
      return { user, patient };
    } else {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }
  }),

  toggleRole: protectedProcedure.mutation(async ({ ctx }) => {
    if (env.NEXT_PUBLIC_TESTMODE !== "TESTING") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Demo mode is disabled",
      });
    }
    await mockDb.user.update({
      where: { id: ctx.session.user.id },
      data: { role: ctx.session.user.role === "doctor" ? "patient" : "doctor" },
    });
  }),
});

export type UserWithoutEmail = inferRouterOutputs<typeof userRouter>["searchUserByName"][0];
