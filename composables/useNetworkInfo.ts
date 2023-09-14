import { NetworkInfo } from '~/electron/utils/getNetworkInfo';

export const useNetworkInfo = createGlobalState(() => {
  const networkInfo = ref<NetworkInfo>();
  const retriveNetworkInfo = () => {
    window.electronAPI.getNetworkInfo().then((info) => {
      networkInfo.value = info;
    });
  };

  retriveNetworkInfo();

  return {
    networkInfo,
    retriveNetworkInfo,
  };
});
