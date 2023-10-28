export const BASE_URL = 'https://storage.googleapis.com/dima-and-svetlana-wedding.appspot.com'
export const IMAGE_LENGTH = 512;
export const MEDIUM_PHOTO_URL = (id: number) => `${BASE_URL}/photos-webp-medium/${id}.webp`
export const BLUR_PHOTO_URL = (id: number) => `${BASE_URL}/photos-webp-blur/${id}.webp`
export const ORIGINAL_PHOTO_URL = (id: number) => `assets/photos-original/${id}.jpg`
