export type PickPartial<T, M> = Partial<Omit<T, keyof M>> & {
  [K in keyof T & keyof M]: M[K] extends object ? PickPartial<T[K], M[K]> : T[K];
} extends infer O
  ? { [K in keyof O]: O[K] }
  : never;
