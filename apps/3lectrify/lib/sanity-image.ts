import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from '@3lectrify/sanity';

const builder = imageUrlBuilder(client);

export function imageBuilder(source: SanityImageSource) {
  return builder.image(source);
}
