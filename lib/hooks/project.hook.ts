import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projectApi } from "../api/project.api";
import { ProjectType } from "../types/project.types";
import { apiService } from "../services/apiService";

export function useGetProjects(serverId: string) {
  return useQuery<ProjectType[]>({
    queryKey: ["projects"],
    queryFn: () => projectApi.getProjects(serverId),
  });
}

export function useGetProject(serverId: string, projectId: string) {
  return useQuery<ProjectType>({
    queryKey: ["project", projectId],
    queryFn: () => projectApi.getProject(serverId, projectId),
    enabled: !!projectId,
  });
}

export const useAddproject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectData,
      serverId,
    }: {
      projectData: any;
      serverId: string;
    }) => projectApi.addProject(projectData, serverId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useUpdateproject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectData,
      serverId,
      projectId,
    }: {
      projectData: any;
      serverId: string;
      projectId: string;
    }) => projectApi.updateProject(projectData, serverId, projectId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
  });
};

export function useAddProjectItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectData,
      serverId,
      projectId,
    }: {
      projectData: any;
      serverId: string;
      projectId: string;
    }) => projectApi.addProjectItem(projectData, serverId, projectId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
  });
}
export function useUpdateProjectItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectData,
      serverId,
      projectId,
      itemId,
    }: {
      projectData: any;
      serverId: string;
      projectId: string;
      itemId: string;
    }) =>
      projectApi.updateProjectItem(projectData, serverId, projectId, itemId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
  });
}

// // --------------------------------------
// // GET PRODUCT IMAGES
// // --------------------------------------
// export function useGetProductImages(productId: string) {
//   return useQuery({
//     queryKey: ["product-images", productId],
//     queryFn: () => productApi.getProductImages(productId),
//     enabled: !!productId,
//   });
// }

// // --------------------------------------
// // DELETE PRODUCT IMAGE
// // --------------------------------------
// export const useDeleteProductImage = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({
//       productId,
//       imageId,
//     }: {
//       productId: string;
//       imageId: string;
//     }) => productApi.DeleteProductImage(productId, imageId),

//     onSuccess: (_, variables) => {
//       queryClient.invalidateQueries({
//         queryKey: ["product", variables.productId],
//       });
//       queryClient.invalidateQueries({
//         queryKey: ["product-images", variables.productId],
//       });
//     },
//   });
// };

// // --------------------------------------
// // UPLOAD PRODUCT IMAGE
// // MUST SEND FORMDATA
// // --------------------------------------
// export const useUploadProductImage = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({
//       productId,
//       formData,
//     }: {
//       productId: string;
//       formData: FormData;
//     }) => productApi.AddProductImage(productId, formData),

//     onSuccess: (_, variables: any) => {
//       queryClient.invalidateQueries({
//         queryKey: ["product", variables.productId],
//       });
//       queryClient.invalidateQueries({
//         queryKey: ["product-images", variables.productId],
//       });
//     },
//   });
// };

// // --------------------------------------
// // SET PRIMARY IMAGE
// // --------------------------------------
// export const useSetPrimaryImage = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({
//       productId,
//       imageId,
//     }: {
//       productId: string;
//       imageId: string;
//     }) => productApi.SetPrimaryImage(productId, imageId),

//     onSuccess: (_, variables) => {
//       queryClient.invalidateQueries({
//         queryKey: ["product", variables.productId],
//       });
//       queryClient.invalidateQueries({
//         queryKey: ["product-images", variables.productId],
//       });
//     },
//   });
// };

// // --------------------------------------
// // GET PRODUCT CATEGORIES
// // --------------------------------------
// export function useGetProductsCategories() {
//   return useQuery({
//     queryKey: ["categories"],
//     queryFn: productApi.getProductsCategory,
//   });
// }

// // --------------------------------------
// // ADD PRODUCT FEATURE  (FIXED)
// // --------------------------------------
// export const useAddProductFeature = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (data: any) => productApi.AddProductFeature(data),

//     onSuccess: (_, variables) => {
//       queryClient.invalidateQueries({
//         queryKey: ["product", variables.productId],
//       });
//     },
//   });
// };

// // --------------------------------------
// // EDIT PRODUCT
// // --------------------------------------
// export const useEditProduct = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (productData: any) =>
//       productApi.EditProduct(productData.id, productData),

//     onSuccess: (_, productData) => {
//       queryClient.invalidateQueries({ queryKey: ["products"] });
//       queryClient.invalidateQueries({ queryKey: ["product", productData.id] });
//     },
//   });
// };

// // --------------------------------------
// // DELETE PRODUCT
// // --------------------------------------
// export const useDeleteProduct = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (productId: string) =>
//       productApi.DeleteProduct(productId),

//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["products"] });
//     },
//   });
// };
