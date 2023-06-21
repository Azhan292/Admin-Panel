const productIds = {
  Classic: {
    16: "143",
    20: "144",
    24: "145",   
  },
  Mini: {
    16: "147",
    20: "148",
    24: "149",
  },
};
const shippings = [
    {
      label: "USPS First-class",
      charges: 0,
      hint: "shipping typically take 2-3 days",
    },
    {
      label: "USPS Priority",
      charges: 0,
      hint: "shipping typically take 1-2 days",
    },
  ];
const upgradesIds = {
  ["Thanks for the Memories"]: "219",
  ["Let the Good Times Roll"]: "220",
  ["All Smiles"]: "221",
  ["Stand Out"]: "222",
  ["Flower Power"]: "223",
  ["Modern Geo"]: "224",
  ["Greatest Hits"]: "225",
  ["Celebrate"]: "226",
};

const shppingMethods = {
  ["USPS First-class"]: "1C",
  ["USPS Priority"]: "PR",
};

export {
  productIds,
  shippings,
  upgradesIds,
  shppingMethods
}