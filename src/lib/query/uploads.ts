import { useMutation } from "@tanstack/react-query";
import { uploadFile, type UploadedObject } from "@/lib/api/uploads";

/** Uploads a file via presign + worker proxy. The returned key can be stored
 * as an attachment reference. */
export function useUploadFile() {
  return useMutation<UploadedObject, Error, File>({
    mutationFn: (file: File) => uploadFile(file),
  });
}
