import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import useFetchOnAutoCompleteOpen from '../hooks/useFetchOnAutoCompleteOpen';

const CustomAutoComplete = ({
  textFieldName = '',
  label = 'Auto Complete',
  endPointSlug = '/instructors',
  multiple = false,
  filterSelectedOptions = false,
  getOptionLabel,
  filterOptions,
  noOptionsText = 'No Such Thing',
  value,
  onChange,
  onBlur,
}) => {
  const { open, error, loading, options, setOpen, clearOptions } =
    useFetchOnAutoCompleteOpen(endPointSlug);

  return (
    <Autocomplete
      multiple={multiple}
      id="asynchronous-demo"
      open={open}
      value={value}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
        clearOptions();
      }}
      onChange={onChange}
      onBlur={onBlur}
      filterSelectedOptions={filterSelectedOptions}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionKey={(option) => option.id}
      getOptionLabel={getOptionLabel}
      filterOptions={filterOptions}
      autoHighlight
      options={options}
      loading={loading}
      noOptionsText={error || noOptionsText}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          name={textFieldName}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default CustomAutoComplete;
