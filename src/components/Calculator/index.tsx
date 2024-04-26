import { TextField, MenuItem, Box, Button, Typography } from "@mui/material";
import useCalculator, { AIDA_CANVA_SIZES, THREAD_COUNTS } from "./hooks";

export default function Calculator() {
  const {
    crossesCount,
    canvaSize,
    threadCount,
    reserve,
    result,
    handleCrossesCountChange,
    handleCanvaSizeChange,
    handleThreadCountChange,
    handleReserveChange,
  } = useCalculator();

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        "& .MuiButton-root": { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        label="Crosses Count"
        variant="outlined"
        value={crossesCount}
        onChange={handleCrossesCountChange}
      />

      <TextField
        select
        label="Canva Size by Aida"
        value={canvaSize}
        onChange={handleCanvaSizeChange}
      >
        {Object.keys(AIDA_CANVA_SIZES).map((size) => (
          <MenuItem key={size} value={size}>
            {size}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Thread Count"
        value={threadCount}
        onChange={handleThreadCountChange}
      >
        {THREAD_COUNTS.map((count) => (
          <MenuItem key={count} value={count}>
            {count}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Reserve"
        InputProps={{
          endAdornment: <Typography>%</Typography>,
        }}
        value={reserve}
        onChange={handleReserveChange}
      />

      <Box>
        <Typography variant="h6">Result:</Typography>
        <Typography>
          Result: <b>{result.length}</b> meters,
          <b>{result.skeinCount}</b> skeins
        </Typography>
      </Box>
    </Box>
  );
}
