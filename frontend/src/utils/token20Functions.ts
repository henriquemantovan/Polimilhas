import {
  useReadPoliMilhasBalanceOf,
  useWritePoliMilhasBuyTokens,
  useWritePoliMilhasCreateNewToken,
  useWritePoliMilhasSendTokens,
  useWritePoliMilhasRedeemToken,
  useReadPoliMilhasTotalSupply,
  useWritePoliMilhasWithdraw,
  useReadPoliMilhasTokenCost,
  useWritePoliMilhasSendToContract,
  useWritePoliMilhasSenToAnotherUser,
  useWritePoliMilhasSetTokenPrice,
  useWritePoliMilhasApprove,
} from "../generated";

export const useTokenFunctions = () => {
  const validateAndFormatAddress = (address: string): `0x${string}` => {
    if (!address.startsWith("0x") || address.length !== 42) {
      throw new Error("Invalid Ethereum address");
    }
    return address as `0x${string}`;
  };

  // Endereço do contrato
  const contractAddress = "0xe8789EaD2eB5f29d7ce9CA0A298C048CA5aeE774";

  // Função utilitária para saldo
  //FAZER UM GETBLANCE DO CONTRATO PRA VER SE DA PRA COMPRAR OU SE NN TEM MAIS TOKENS NO CONTRATO
  const getBalance = async (account: string): Promise<number> => {
    if (!account) return 0;
  
    try {
      const formattedAddress = validateAndFormatAddress(account);
      const { data } = useReadPoliMilhasBalanceOf({
        address: contractAddress,
        args: [formattedAddress],
      });
  
      // Verificar se o dado está disponível
      if (data) {
        return Number(data); // Converter BigInt para número
      }
      return 0;
    } catch (err) {
      console.error("Erro ao processar saldo:", err);
      return 0;
    }
  };
  
  
  

  // Hooks de leitura
  const {
    data: readPoliMilhasTotalSupply,
    isLoading: isTotalSupplyLoading,
    isError: isTotalSupplyError,
  } = useReadPoliMilhasTotalSupply();
  const {
    data: readPoliMilhasTokenCost,
    isLoading: isTokenCostLoadin,
    isError: isTokenCostError,
  } = useReadPoliMilhasTokenCost();

  // Hooks de escrita
  const {
    writeContractAsync: writePoliMilhasBuyTokens,
    isSuccess: isBuySuccess,
    isPending: isBuyPending,
    isError: isBuyError,
  } = useWritePoliMilhasBuyTokens();
  const {
    writeContractAsync: writePoliMilhasCreateNewToken,
    isSuccess: isCreateSuccess,
    isPending: isCreatePending,
    isError: isCreateError,
  } = useWritePoliMilhasCreateNewToken();
  const {
    writeContractAsync: writePoliMilhasSendTokens,
    isSuccess: isSendSuccess,
    isPending: isSendPending,
    isError: isSendError,
  } = useWritePoliMilhasSendTokens();
  const {
    writeContractAsync: writePoliMilhasRedeemToken,
    isSuccess: isRedeemSuccess,
    isPending: isRedeemPending,
    isError: isRedeemError,
  } = useWritePoliMilhasRedeemToken();

  const {
    writeContractAsync: writePoliMilhasSendToContract,
    isPending: isSendToContractPending,
    isSuccess: isSendToContractSuccess,
    isError: isSendToContractError,
  } = useWritePoliMilhasSendToContract();
  const {
    writeContractAsync: writePoliMilhasSendToAnotherUser,
    isPending: isSendToAnotherUserPending,
    isSuccess: isSendToAnotherUserSuccess,
    isError: isSendToAnotherUserError,
  } = useWritePoliMilhasSenToAnotherUser();
  const {
    writeContractAsync: writePoliMilhasSetTokenPrice,
    isPending: isSetTokenPricePending,
    isSuccess: isSetTokenPriceSuccess,
    isError: isSetTokenPriceError,
  } = useWritePoliMilhasSetTokenPrice();
  const {
    writeContractAsync: writePoliMilhasWithdraw,
    isPending: isWithdrawPending,
    isSuccess: isWithdrawSuccess,
    isError: isWithdrawError,
  } = useWritePoliMilhasWithdraw();
  const {
    writeContractAsync: writePoliMilhasApprove,
    isPending: isApprovePending,
    isSuccess: isApproveSuccess,
    isError: isApproveError,
  } = useWritePoliMilhasApprove();

  // Funções de exemplo para leitura e escrita

  // {/*nftContract*/}
  const Approve = async (amount: number) => {
    const bigIntAmount = BigInt(amount);
    try {
      const tx = await writePoliMilhasApprove({
        address: contractAddress,
        args: [validateAndFormatAddress("0x4cf9cAC008AE6EfcBcC77e7B6Cd805A3df14E05E"), bigIntAmount], 
      });
      console.log("Token approved:", tx);
      return tx;
    } catch (error) {
      console.error("Error approving token:", error);
      return null;
    }
  };

  const CreateNewToken = async (amount: number) => {
    const bigIntAmount = BigInt(amount);
    try {
      const tx = await writePoliMilhasCreateNewToken({
        address: contractAddress,
        args: [bigIntAmount],
      });
      console.log("Token created:", tx);
      return tx;
    } catch (error) {
      console.error("Error creating token:", error);
      return null;
    }
  };

  const buyTokens = async (value: number) => {
    const bigIntValue = BigInt(value);
    try {
      const tx = await writePoliMilhasBuyTokens({
        address: contractAddress,
        value: bigIntValue,
      });
      console.log("Tokens bought:", tx);
      return tx;
    } catch (error) {
      console.error("Error buying tokens:", error);
      return null;
    }
  };

  const redeemToken = async (amount: number, price: number) => {
    const bigIntAmount = BigInt(amount);
    const bigIntPrice = BigInt(price);
    try {
      const tx = await writePoliMilhasRedeemToken({
        address: contractAddress,
        args: [bigIntAmount],
        value: bigIntPrice,
      });

      console.log("Token redeemed:", tx);
      return tx;
    } catch (error) {
      console.error("Error redeeming token:", error);
      return null;
    }
  };

  const sendTokens = async (recipient: string, amount: number) => {
    const bigIntAmount = BigInt(amount);
    try {
      const tx = await writePoliMilhasSendTokens({
        address: contractAddress,
        args: [validateAndFormatAddress(recipient), bigIntAmount],
      });
      console.log("Tokens sent to contract:", tx);
      return tx;
    } catch (error) {
      console.error("Error sending tokens:", error);
      return null;
    }
  };

  //TA INUTIL?
  const sendToContract = async (amount: number) => {
    const bigIntAmount = BigInt(amount);
    try {
      const tx = await writePoliMilhasSendToContract({
        address: contractAddress,
        args: [bigIntAmount],
      });
      console.log("Tokens sent to contract:", tx);
      return tx;
    } catch (error) {
      console.error("Error sending tokens:", error);
      return null;
    }
  };

  const senToAnotherUser = async (amount: number, vendor: string) => {
    const bigIntAmount = BigInt(amount);
    try {
      const tx = await writePoliMilhasSendToAnotherUser({
        address: contractAddress,
        args: [bigIntAmount, validateAndFormatAddress(vendor)],
      });
      console.log("Tokens sent to another user:", tx);
      return tx;
    } catch (error) {
      console.error("Error sending tokens:", error);
      return null;
    }
  };

  const setTokenPrice = async (newPrice: number) => {
    const bigIntPrice = BigInt(newPrice);
    try {
      const tx = await writePoliMilhasSetTokenPrice({
        address: contractAddress,
        args: [bigIntPrice],
      });
      console.log("Token price set:", tx);
      return tx;
    } catch (error) {
      console.error("Error setting token price:", error);
      return null;
    }
  };

  const Withdraw = async () => {
    try {
      const tx = await writePoliMilhasWithdraw({
        address: contractAddress,
      });
      console.log("Tokens withdrawn:", tx);
      return tx;
    } catch (error) {
      console.error("Error withdrawing tokens:", error);
      return null;
    }
  };

  return {
    // Função utilitária para saldo
    getBalance,

    // Funções de leitura
    readPoliMilhasTotalSupply,
    readPoliMilhasTokenCost,

    // Estados de carregamento // Exige chamada dinâmica
    isBuyPending,
    isBuySuccess,
    isBuyError,
    isCreatePending,
    isCreateSuccess,
    isCreateError,
    isRedeemPending,
    isRedeemSuccess,
    isRedeemError,
    isSendPending,
    isSendSuccess,
    isSendError,
    isWithdrawPending,
    isWithdrawSuccess,
    isWithdrawError,
    isSetTokenPricePending,
    isSetTokenPriceSuccess,
    isSetTokenPriceError,
    isSendToContractPending,
    isSendToContractSuccess,
    isSendToContractError,
    isSendToAnotherUserPending,
    isSendToAnotherUserSuccess,
    isSendToAnotherUserError,
    isTokenCostError,
    isTokenCostLoadin,
    isTotalSupplyError,
    isTotalSupplyLoading,
    isApprovePending,
    isApproveSuccess,
    isApproveError,

    // Funções utilitárias
    CreateNewToken,
    buyTokens,
    redeemToken,
    sendTokens,
    sendToContract,
    senToAnotherUser,
    setTokenPrice,
    Withdraw,
    Approve,
  };
};
