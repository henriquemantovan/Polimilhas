import {
  useReadPoliMilhasBalanceOf,
  useWritePoliMilhasTransfer,
  useWritePoliMilhasBuyTokens,
  useWritePoliMilhasCreateNewToken,
  useWritePoliMilhasSendTokens,
  useWritePoliMilhasRedeemToken,
  useReadPoliMilhasTotalSupply,
} from "../generated";

export const useContractFunctions = () => {
  const validateAndFormatAddress = (address: string): `0x${string}` => {
    if (!address.startsWith("0x") || address.length !== 42) {
      throw new Error("Invalid Ethereum address");
    }
    return address as `0x${string}`;
  };

  // Endereço do contrato
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  // Função utilitária para saldo
  const getBalance = (account: string) => {
    const { data: balance, isPending: isBalanceLoading } = useReadPoliMilhasBalanceOf({
      address: contractAddress,
      args: [validateAndFormatAddress(account)],
    });
    return { balance, isBalanceLoading };
  };

  // Hooks de leitura
  const { data: readPoliMilhasTotalSupply, isLoading: isTotalSupplyLoading } = useReadPoliMilhasTotalSupply();

  // Hooks de escrita
  const {
    writeContractAsync: writePoliMilhasTransfer,
    isSuccess: isTransferSuccess,
    isPending: isTransferPending,
    isError: isTransferError,
  } = useWritePoliMilhasTransfer();
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

  // Funções de exemplo para leitura e escrita
  const fetchBalance = async (account: string) => {
    try {
      const { balance } = getBalance(account);
      console.log("Balance fetched:", balance);
      return balance;
    } catch (error) {
      console.error("Error fetching balance:", error);
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

  const transferTokens = async (to: string, amount: string) => {
    const bigIntAmount = BigInt(amount);
    try {
      const tx = await writePoliMilhasTransfer({
        address: contractAddress,
        args: [validateAndFormatAddress(to), bigIntAmount],
      });
      console.log("Transfer successful:", tx);
      return tx;
    } catch (error) {
      console.error("Error transferring tokens:", error);
      return null;
    }
  };

  const buyTokens = async (value: string) => {
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

  return {
    // Função utilitária para saldo
    getBalance,
    fetchBalance,

    // Funções de leitura
    readPoliMilhasTotalSupply,
    isTotalSupplyLoading,

    // Estados de carregamento
    isBalanceLoading: getBalance, // Exige chamada dinâmica
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
    isTransferPending,
    isTransferSuccess,
    isTransferError,

    // Funções de escrita
    writePoliMilhasTransfer,
    writePoliMilhasBuyTokens,
    writePoliMilhasCreateNewToken,
    writePoliMilhasSendTokens,
    writePoliMilhasRedeemToken,

    // Funções utilitárias
    CreateNewToken,
    transferTokens,
    buyTokens,
    redeemToken,
  };
};
