export const calculateDeliveryCost = (amount: number, distance: number) => {
  let deliveryCost = 0;
  if (amount < 40 && distance <= 3) deliveryCost = 5;
  else deliveryCost = 0;
  return deliveryCost;
};
