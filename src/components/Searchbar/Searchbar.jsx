import { useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import Icon from 'components/Icon';

import { SearchBar, SearchForm, Button, ButtonLabel, Input } from "./Searchbar.styled";

export const Searchbar = ({ onSearch }) => {
    const [value, setValue] = useState('');

    const inputChange = ({ target: { value } }) => { 
        setValue(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(value.trim() === '') {
            toast.error('Введіть ключове слово в поле для пошуку', {
                duration: 3000,
                position: 'top-right',
            });
        };

        onSearch(value.trim());
        setValue('');
        e.currentTarget.reset();
    };

    return (
        <SearchBar>
            <SearchForm onSubmit={handleSubmit}>
                <Button type="submit">
                    <ButtonLabel>Search</ButtonLabel>
                    <Icon />
                </Button>

                <Input
                    type="text"
                    autocomplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={inputChange}
                />
            </SearchForm>
        </SearchBar>
    );
};

export default Searchbar;

Searchbar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};
