

export const dateToString = (date, time= null) => {
	if(date && date !== '')
    	return new Date(date).toDateString() +' '+ (time ? new Date(date).toLocaleTimeString('id') : '')
   	return '';
}