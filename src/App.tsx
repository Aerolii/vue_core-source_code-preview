import { defineComponent, onUpdated, reactive } from 'vue';

import ReviewReactive from './components/ReviewReactive.vue';

export default defineComponent({
  setup() {
    const s = new Map();
    const mapRef = reactive(s);

    mapRef.set('name', 'jack');

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
