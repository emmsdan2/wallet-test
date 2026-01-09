export const LIMIT = 1500;

export const getRandomBalance = () => Math.random() * LIMIT;
export const formatKilo = (num: number): string => {
  if (num >= 1000000) {
    return Math.round(num / 1000000) + "M";
  }
  if (num >= 1000) {
    return Math.round(num / 1000) + "K";
  }
  return num.toString();
};
export const calculateDailyPoints = () => {
  const now = new Date();
  const startOfSeason = new Date(now.getFullYear(), 1, 18); 
  const diffTime = Math.abs(now.getTime() - startOfSeason.getTime());
  const dayOfSeason = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let points: number[] = [2, 3]; 
  
  if (dayOfSeason > 2) {
    for (let i = 2; i < dayOfSeason; i++) {
      points.push(points[i - 2] + (points[i - 1] * 0.6));
    }
  }

  const total = Math.round(points[dayOfSeason - 1]);
  
  console.log({ total })
  if (total >= 1000) {
    return formatKilo(total)
  }
  
  return total.toString();
};

export const formatTxDate = (dateStr: string, authUser?: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  const dayDisplay = diffDays < 7 
    ? date.toLocaleDateString('en-US', { weekday: 'long' }) 
    : date.toLocaleDateString('en-US');

  return authUser ? `${authUser} — ${dayDisplay}` : dayDisplay;
};

export const getTransactionDisplay = (t: any) => {
  const dateObj = new Date(t.date);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - dateObj.getTime()) / (1000 * 60 * 60 * 24));

  // 1. Date Logic: Day name for last week, date for older
  const dateDisplay = diffDays < 7 
    ? dateObj.toLocaleDateString('en-US', { weekday: 'long' }) 
    : dateObj.toLocaleDateString('en-US');

  // 2. Authorized User: Display name before the date
  const detail = t.authorizedUser ? `${t.authorizedUser} — ${dateDisplay}` : dateDisplay;

  // 3. Pending logic: "Pending" before description
  const description = t.isPending ? `Pending — ${t.description}` : t.description;

  // 4. Amount logic: "+" for Payments
  const amountDisplay = t.type === "Payment" ? `+$${t.amount}` : `$${t.amount}`;

  return { detail, description, amountDisplay };
};

export const dateDetails = (dateStr: string)=>{
    const date = new Date(dateStr);

return `${String(date.getDate()).padStart(2, "0")}/${String(
  date.getMonth() + 1
).padStart(2, "0")}/${date.getFullYear()}, ${String(
  date.getHours()
).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

}
