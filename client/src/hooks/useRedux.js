//redux
import { useSelector, useDispatch } from "react-redux";

const useRedux = () => {
  const dispatch = useDispatch();
  const useAppSelector = useSelector;
  return { dispatch, useAppSelector };
};

export { useRedux };
