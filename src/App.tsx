import { defineComponent, onUpdated, reactive } from 'vue';

import ReviewReactive from './components/ReviewReactive.vue';

export default defineComponent({
  setup() {
    console.log(1);
    const s = new Map();
    s.set('name', 'smith');
    const mapRef = reactive(s);

    mapRef.get('name');

    mapRef.set('name', 'jack');

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
