export const calculateDeliveryCost = (amount: number, distance: number) => {
  let deliveryCost = 0;
  if (amount < 40 && distance <= 3) deliveryCost = 5;
  else if (amount < 70 && distance <= 4) deliveryCost = 7;
  else deliveryCost = 5;
  return deliveryCost;
};
