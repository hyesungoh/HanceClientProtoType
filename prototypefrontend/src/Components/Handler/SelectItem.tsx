import { InputLabel, Select, MenuItem, SelectProps } from "@material-ui/core";
import styled from "styled-components";

interface ISelectItem {
    inputLabel: string;
    id: string;
    value: any;
    onChange: SelectProps["onChange"];
    menuItems: any[];
}

const SelectItem = ({
    inputLabel,
    id,
    value,
    onChange,
    menuItems,
}: ISelectItem) => {
    return (
        <Wrapper>
            <InputLabel htmlFor={id}>{inputLabel}</InputLabel>
            <Select style={{width: "100%"}} labelId={id} id={id} value={value} onChange={onChange}>
                {menuItems.map((menuItem, index) => (
                    <MenuItem key={index} value={menuItem}>
                        {menuItem}
                    </MenuItem>
                ))}
            </Select>
        </Wrapper>
    );
};

export default SelectItem;

const Wrapper = styled.div`
    width: 100%;
`;
