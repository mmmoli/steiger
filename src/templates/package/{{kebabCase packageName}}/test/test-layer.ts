import { vi } from "@effect/vitest";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Domain from "../src/domain";

const now = new Date();

export const {{ kebabCase aggregateName }}1Id = Domain.{{ pascalCase aggregateName }}Id.make("test-{{ kebabCase aggregateName }}-id");

export const {{ kebabCase aggregateName }}1 = Domain.{{ pascalCase aggregateName }}.make({
  id: {{ kebabCase aggregateName }}1Id,
  name: Domain.{{ pascalCase aggregateName }}Name.make("Test {{ pascalCase aggregateName }}"),
  createdAt: now,
  updatedAt: now,
});

export const {{ pascalCase aggregateName }}RepoSpy: Domain.{{ pascalCase aggregateName }}RepoTrait = {
  getForId: vi.fn().mockReturnValue(Effect.succeed(Option.some({{ kebabCase aggregateName }}1))),
  save: vi.fn().mockReturnValue(Effect.succeed(void 0)),
  delete: vi.fn().mockReturnValue(Effect.succeed(void 0)),
};

export const {{ pascalCase aggregateName }}RepoTest = Layer.succeed(
  Domain.{{ pascalCase aggregateName }}Repo,
  Domain.{{ pascalCase aggregateName }}Repo.of({{ pascalCase aggregateName }}RepoSpy),
);

export const layer = Layer.mergeAll({{ pascalCase aggregateName }}RepoTest);
