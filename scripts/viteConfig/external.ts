import { toReg } from '../helpers/regExp';
import type { PackageJson } from 'type-fest';

export function getExternal(pkg: PackageJson) {
  const { peerDependencies = {} } = pkg;

  const defaultExternal: (string | RegExp)[] = [
    // node 模块
    /^node:.*/
  ];

  const deps = Object.keys(peerDependencies);

  const outputGlobals: Record<string, string> = {};

  const external = defaultExternal.concat(
    deps.map((dep) => {
      outputGlobals[dep] = dep;
      return toReg(dep);
    })
  );

  return {
    external,
    outputGlobals
  };
}
