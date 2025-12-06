import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { serverApi } from "../api/server.api";

export function useGetServers() {
  return useQuery({
    queryKey: ["servers"],
    queryFn: () => serverApi.getServers(),
  });
}

export function useGetPublicServers() {
  return useQuery({
    queryKey: ["public-servers"],
    queryFn: () => serverApi.getPublicServers(),
  });
}

// GET A SINGLE SERVER
export function useGetServer(serverId: string) {
  return useQuery({
    queryKey: ["server", serverId],
    queryFn: () => serverApi.getServer(serverId),
    enabled: !!serverId,
  });
}

// GET  SERVER INVITES
export function useGetServerInvites() {
  return useQuery({
    queryKey: ["server-invites"],
    queryFn: () => serverApi.getServerInvites(),
  });
}

export const useAcceptServerInvites = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (serverId: string) => serverApi.acceptServerInvites(serverId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["servers"] });
      queryClient.invalidateQueries({ queryKey: ["feeds"] });
      queryClient.invalidateQueries({ queryKey: ["server-invites"] });
    },
  });
};

export const useRejectServerInvites = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (serverId: string) => serverApi.rejectServerInvites(serverId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["servers"] });
      queryClient.invalidateQueries({ queryKey: ["feeds"] });
      queryClient.invalidateQueries({ queryKey: ["server-invites"] });
    },
  });
};

export const useCreateServer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (serverData) => serverApi.createServer(serverData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["servers"] });
    },
  });
};

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
