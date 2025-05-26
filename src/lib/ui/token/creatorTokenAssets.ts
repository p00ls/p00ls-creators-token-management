export const CreatorTokenAssets = {
  logo: (tokenId: string) =>
    `/tokens/${tokenId}/logo.png`,

  token: (tokenId: string, assetsBaseUrl?: string) =>
    `${basePath(assetsBaseUrl)}${tokenId}/token.png`,
};

function basePath(assetsBaseUrl?: string) {
  return assetsBaseUrl ? `${assetsBaseUrl}/` : '';
}
