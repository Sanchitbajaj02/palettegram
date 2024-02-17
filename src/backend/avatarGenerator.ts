export const generateAvatar = (name: string, variant: string = 'marble', size: number = 120, colors: string[] = []): string => {
    const encodedName = encodeURIComponent(name);
    const baseUrl = 'https://source.boringavatars.com/';
    
    let url = `${baseUrl}${variant}/${size}/${encodedName}`;
  
    if (colors.length > 0) {
      const encodedColors = colors.map(color => encodeURIComponent(color)).join(',');
      url += `?colors=${encodedColors}`;
    }
  
    return url;
  };