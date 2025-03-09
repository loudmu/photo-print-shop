import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";

// Generate a mutation to store file IDs in the database
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    // Get the currently authenticated user
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    // Generate a new upload URL
    return await ctx.storage.generateUploadUrl();
  },
});

// Save the file metadata after upload is complete
export const savePhoto = mutation({
  args: {
    storageIds: v.array(
      v.object({
        storageId: v.string(),
        fileName: v.string(),
        fileSize: v.number(),
        fileType: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    // Get the currently authenticated user
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const userId = identity.tokenIdentifier;
    const now = new Date().toISOString();

    // Process each uploaded file
    const photoIds = await Promise.all(
      args.storageIds.map(async ({ storageId, fileName, fileSize, fileType }) => {
        // Get image dimensions from the file metadata
        let width = 0;
        let height = 0;
        
        // For image files, try to extract dimensions
        if (fileType.startsWith("image/")) {
          try {
            // const url = await ctx.storage.getUrl(storageId);
            // In a real implementation, you might use a worker to get dimensions
            // For now, we'll use placeholder values
            width = 1920;
            height = 1080;
          } catch (error) {
            console.error("Error getting image dimensions:", error);
          }
        }

        // Save the photo metadata to the database
        const photoId = await ctx.db.insert("photos", {
          userId,
          fileName,
          storageId,
          uploadedAt: now,
          metadata: {
            width,
            height,
            format: fileType.split("/")[1] || "unknown",
            size: fileSize,
          },
        });

        return photoId;
      })
    );

    return photoIds;
  },
});