import { createContext, useState } from "react";

export const FilterContext = createContext();

const MIN = 30;
const MAX = 120;
function FilterProvider({ children }) {
  const [values, setValues] = useState([MIN, MAX]);
  const [size, setSize] = useState(0);
  const [age, setAge] = useState(0);
  return (
    <FilterContext.Provider
      value={{ size, setSize, age, setAge, values, setValues, MAX, MIN }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export default FilterProvider;
