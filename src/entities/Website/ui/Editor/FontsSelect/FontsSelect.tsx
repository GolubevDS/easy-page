import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { useFontSelect } from './FontsSelect.hook';
import { FONTS } from '@/entities/Website';

export const FontsSelect = () => {
  const { font, handleChange, isLoading } = useFontSelect();

  return (
    <Select
      onValueChange={handleChange}
      defaultValue={font}
      disabled={isLoading}
    >
      <SelectTrigger className='input'>
        <SelectValue placeholder='Select fonts' />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(FONTS).map((fontName) => (
          <SelectItem
            key={fontName}
            value={fontName}
            className={FONTS[fontName].className}
          >
            {fontName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
