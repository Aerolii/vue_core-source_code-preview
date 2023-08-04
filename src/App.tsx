import { defineComponent, onUpdated, reactive } from 'vue';

import ReviewReactive from './components/ReviewReactive.vue';

export default defineComponent({
  setup() {
    console.log(1);
    const s = new Map();
    const mapRef = reactive(s);

    mapRef.set('name', 'jack');

    const printA = '1';

    console.log('s====>', s.get('name'));
    onUpdated(() => {
      console.log('parent updated');
    });

    return () => {
      return (
        <div>
          {mapRef.get('name')}
          <ReviewReactive />
        </div>
      );
    };
  },
});
