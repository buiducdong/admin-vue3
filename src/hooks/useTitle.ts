import { ref, watch } from "vue";

/** Project Title */
const VM_APP_TITLE = "VI-MASH";

/** Dynamic Title */
const dynamicTitle = ref<string>("");

/** Set Title */
const setTitle = (title?: string) => {
  dynamicTitle.value = title ? `${VM_APP_TITLE} | ${title}` : VM_APP_TITLE;
};

/** Listen for title changes */
watch(dynamicTitle, (value, oldValue) => {
  if (document && value !== oldValue) {
    document.title = value;
  }
});

export function useTitle() {
  return { setTitle };
}
