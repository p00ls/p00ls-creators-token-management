import {useMemo} from "react";
import {createTheGraphClient} from "./theGraphClient";
import {useBuildConfiguration} from "../configuration/BuildConfigurationProvider";

export function useTheGraph() {
  const configuration = useBuildConfiguration();
  return useMemo(
    () => createTheGraphClient({configuration}),
    [configuration]
  );
}
