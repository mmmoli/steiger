import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";

export const CacheKey = Schema.NonEmptyTrimmedString.pipe(
  Schema.brand("CacheKey"),
  Schema.annotations({
    identifier: "CacheKey",
  }),
);

export type CacheKey = typeof CacheKey.Type;

export class CacheKeyGenerator extends Effect.Service<CacheKeyGenerator>()(
  "module-common/application/CacheKeyGenerator",
  {
    sync: () => {
      const make = (input: unknown) => {
        const str = JSON.stringify(input);
        let h = 2166136261 >>> 0;
        for (let i = 0; i < str.length; i++) {
          h ^= str.charCodeAt(i);
          h = Math.imul(h, 16777619);
        }
        const key = CacheKey.make(h.toString(36));
        return key;
      };
      return { make } as const;
    },
  },
) {}
