import { Subject } from 'rxjs';
import Vue, { VueConstructor } from 'vue';

declare const Component: VueConstructor<{
  direction: string;
  minDistance: number;
  throttleTime: number;
} & Vue>;
export default Component;
