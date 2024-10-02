import { ref } from "vue";

export function useFocus() {
  /** Is there focus? */
  const isFocus = ref<boolean>(false);

  /** Loss of focus */
  const handleBlur = () => {
    isFocus.value = false;
  };
  /** Get Focus */
  const handleFocus = () => {
    isFocus.value = true;
  };

  return { isFocus, handleBlur, handleFocus };
}
