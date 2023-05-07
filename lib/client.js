import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: '8ojpij95',
  dataset: 'production',
  apiVersion: '2023-04-04',
  useCdn: true,
  token: "sk6ViGckjlcoaFWEizyeA1TK37xx6jW6iBUX2m7lp9KuKzPrkGl2TJFYOM3blkgjzzNSWMs8FmIJek6hFxpWRoq78Vi6XIWIBTHiJB8YYcpX3yLCRicY3XWWYn93cRsEgRJMpJzYZiVZYp9Yx4Qvx9HN4rrOJW6g0alQ238C3jqbkG9OFD1z"
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);