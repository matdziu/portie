import deleteFilesUseCase from "@/domain/storage/use-cases/delete-files-use-case";
import prisma from "@/lib/prisma";
import { extractPath } from "@/lib/storage-utils";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import "server-only";
import { DeleteAccountResult } from "../entities/delete-account-result";
import requireLoggedInUser from "./require-logged-in-user";

export default async function deleteAccountUseCase(): Promise<DeleteAccountResult> {
  try {
    const authUser = await requireLoggedInUser();
    const supabase = createSupabaseAdminClient();

    const userPage = await prisma.userPageDb.findUnique({
      where: { userId: authUser.id },
      select: {
        pictureUrl: true,
        projects: {
          select: {
            pictureUrl: true,
          },
        },
      },
    });

    const pagePictureUrls: string[] = [];
    const projectPictureUrls: string[] = [];

    if (userPage?.pictureUrl) {
      pagePictureUrls.push(userPage.pictureUrl);
    }

    userPage?.projects.forEach((project) => {
      if (project.pictureUrl) {
        projectPictureUrls.push(project.pictureUrl);
      }
    });

    const pageFilePaths = pagePictureUrls
      .map((url) => extractPath(url, "page-pictures"))
      .filter(Boolean) as string[];
    const projectFilePaths = projectPictureUrls
      .map((url) => extractPath(url, "project-pictures"))
      .filter(Boolean) as string[];

    if (pageFilePaths.length > 0) {
      const { error } = await deleteFilesUseCase({
        bucketName: "page-pictures",
        filePaths: pageFilePaths,
      });

      if (error) {
        return {
          success: false,
          error: true,
        };
      }
    }

    if (projectFilePaths.length > 0) {
      const { error } = await deleteFilesUseCase({
        bucketName: "project-pictures",
        filePaths: projectFilePaths,
      });

      if (error) {
        return {
          success: false,
          error: true,
        };
      }
    }

    await prisma.userDb.delete({
      where: {
        id: authUser.id,
      },
    });

    const { error: authError } = await supabase.auth.admin.deleteUser(
      authUser.id
    );
    if (authError) {
      console.error(authError);
      return { success: false, error: true };
    }

    return {
      success: true,
      error: false,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: true,
    };
  }
}
