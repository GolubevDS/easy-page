import { THEMES } from '@/entities/Website/model/constants/themes';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { useThemeSelect } from './ThemeSelect.hook';

export const ThemeSelect = () => {
  const { theme, isLoading, handleChange } = useThemeSelect();

  return (
    <Select onValueChange={handleChange} value={theme} disabled={isLoading}>
      <SelectTrigger className='input'>
        <SelectValue placeholder='Select theme' />
      </SelectTrigger>
      <SelectContent>
        {THEMES.map(({ name, background, textDemo, accent }) => (
          <SelectItem key={name} value={name}>
            <div className={`flex items-center space-x-2`}>
              <div className='flex items-center rounded border overflow-hidden'>
                <div className={`w-3 h-6 ${background}`} />
                <div className={`w-3 h-6 ${textDemo}`} />
                <div className={`w-3 h-6 ${accent}`} />
              </div>

              <span>{name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
