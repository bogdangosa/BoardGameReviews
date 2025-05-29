export default function getApiUrl(apiAddress: string) {
  const {
    public: { serverAdress },
  } = useRuntimeConfig();

  const url = `${serverAdress}${apiAddress}`;

  return url;
}
