import { createTRPCRouter, protectedProcedure } from "./trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

// Mocking the S3 interactions
const mockS3Client = {
  getSignedUrl: (command: any, options: any) => {
    // Mocking a signed URL response with a mock URL
    return `https://mock-s3-url.com/${command.input.Key}?expires_in=${options.expiresIn}`;
  },
};

const mockDb = {
  patient: {
    update: async (data: any) => {
      // Simulating a database update
      console.log("Mock DB update:", data);
    },
    findUnique: async (input: any) => {
      // Mocking fetching patient data with files
      if (input.where.userId === "valid-user-id") {
        return {
          userId: "valid-user-id",
          files: [
            {
              name: "file1.pdf",
              type: "PDF",
              createdAt: new Date(),
            },
            {
              name: "file2.pdf",
              type: "PDF",
              createdAt: new Date(),
            },
          ],
        };
      }
      return null; // Simulate user not found
    },
  },
};

// The Router Mock
export const S3Router = createTRPCRouter({
  // Simulate creating a presigned URL
  createPresignedUrl: protectedProcedure
    .input(z.object({ filename: z.string() }))
    .mutation(async ({ input, ctx }) => {
      if (process.env.NEXT_PUBLIC_TESTMODE === "TESTING") {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      const filename = `${ctx.session.user.id}_${new Date().getTime().toString().slice(8)}_${input.filename}`;
      const url = await mockS3Client.getSignedUrl(
        { input: { Key: filename } },
        { expiresIn: 3600 }
      );
      return { url, filename };
    }),

  // Simulate registering an upload
  registerUpload: protectedProcedure
    .input(z.object({ filename: z.string() }))
    .mutation(async ({ input, ctx }) => {
      if (process.env.NEXT_PUBLIC_TESTMODE === "TESTING") {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      // Mock DB interaction for registering upload
      await mockDb.patient.update({
        data: {
          files: { create: { name: input.filename, type: "PDF" } },
        },
        where: {
          userId: ctx.session.user.id,
        },
      });
    }),

  // Simulate fetching the upload list for a user
  getUploadList: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input, ctx }) => {
      if (ctx.session.user.role !== "doctor" && ctx.session.user.id !== input.userId) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      const user = await mockDb.patient.findUnique({
        where: { userId: input.userId },
        include: { files: { orderBy: { createdAt: "desc" } } },
      });

      if (!user) throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      if (!user.files) throw new TRPCError({ code: "NOT_FOUND", message: "Files not found" });

      return user.files;
    }),

  // Simulate getting a download link for a file
  getDownloadLink: protectedProcedure
    .input(z.object({ filename: z.string() }))
    .mutation(async ({ input }) => {
      // Simulate getting a signed URL for download
      const url = await mockS3Client.getSignedUrl(
        { input: { Key: input.filename } },
        { expiresIn: 3600 }
      );
      return url;
    }),
});
