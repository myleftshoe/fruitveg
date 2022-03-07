const isProd = process.env.NODE_ENV === 'production'

export const ATRIA_USERNAME = isProd ? process.env.ATRIA_USERNAME : import.meta.env.VITE_ATRIA_USERNAME
export const ATRIA_PASSWORD = isProd ? process.env.ATRIA_PASSWORD : import.meta.env.VITE_ATRIA_PASSWORD
export const MINEW_USERNAME = isProd ? process.env.MINEW_USERNAME : import.meta.env.VITE_MINEW_USERNAME
export const MINEW_PASSWORD = isProd ? process.env.MINEW_PASSWORD : import.meta.env.VITE_MINEW_PASSWORD
