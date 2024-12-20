import {
  useWriteNftMilhasCreateToken,
  useWriteNftMilhasBuyNft,
  useReadNftMilhasTokenImageUrl,
  useReadNftMilhasPrice,
} from "../generated";

export const useNftFunctions = () => {
  // Endereço do contrato

  const contractAddress = "0x4cf9cAC008AE6EfcBcC77e7B6Cd805A3df14E05E";

  const {
    writeContractAsync: writeNftMilhasCreateToken,
    isSuccess: isCreateSuccess,
    isPending: isCreatePending,
    isError: isCreateError,
  } = useWriteNftMilhasCreateToken();
  const {
    writeContractAsync: writeNftMilhasBuyNft,
    isSuccess: isBuySuccess,
    isPending: isBuyPending,
    isError: isBuyError,
  } = useWriteNftMilhasBuyNft();

  const getNftPrice = async (tokenId: number) => {
    try {
      const {
        data: readNftprice,
        isPending: isPriceLoading,
        isError: isPriceError,
      } = useReadNftMilhasPrice({
        address: contractAddress,
        args: [BigInt(tokenId)],
      });
      return { readNftprice, isPriceLoading, isPriceError };
    } catch (error) {
      return error;
    }
  };

  const getNftImageUrl = async (tokenId: number) => {
    try {
      const {
        data: readNftImage,
        isPending: isTokenImageUrlLoading,
        isError: isTokenImageUrlError,
      } = useReadNftMilhasTokenImageUrl({
        address: contractAddress,
        args: [BigInt(tokenId)],
      });
      return { readNftImage, isTokenImageUrlLoading, isTokenImageUrlError };
    } catch (error) {
      return error;
    }
  };

  const buyNft = async (tokenId: number) => {
    const bigIntTokenId = BigInt(tokenId);
    try {
      const tx = await writeNftMilhasBuyNft({
        address: contractAddress,
        args: [bigIntTokenId],
      });
      console.log("NFT bought:", tx);
      return tx;
    } catch (error) {
      console.error("Error buying NFT:", error);
      return null;
    }
  };

  const createNFT = async (tokenId: number, tokenImage: string, price: number) => {
    const bigIntTokenId = BigInt(tokenId);
    const bigIntPrice = BigInt(price);
    try {
      const tx = await writeNftMilhasCreateToken({
        address: contractAddress,
        args: [bigIntTokenId, tokenImage, bigIntPrice],
      });
      console.log("Token created:", tx);
      return tx;
    } catch (error) {
      console.error("Error creating token:", error);
      return null;
    }
  };

  return {
    // Funções de escrita
    writeNftMilhasCreateToken,
    writeNftMilhasBuyNft,
    buyNft,
    createNFT,

    // Funções de leitura
    getNftPrice,
    getNftImageUrl,

    // Estados de carregamento
    isCreatePending,
    isCreateSuccess,
    isCreateError,
    isBuyPending,
    isBuySuccess,
    isBuyError,
  };
};
