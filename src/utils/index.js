export const navOptions = [
    {
        id:"home",
        label:"Home",
        path:"/"
    },
    {
        id:"listing",
        label:"All Products",
        path:"/product/listing/all-products"
    },
    {
        id:"listingMen",
        label:"Men",
        path:"/product/listing/men"
    },
    {
        id:"listingWomen",
        label:"Women",
        path:"/product/listing/women"
    },
    {
        id:"listingKids",
        label:"Kids",
        path:"/product/listing/kids"
    },
];

export const navAdminOptions = [
    {
        id:"adminListing",
        label:"Manage All Products",
        path:"/admin-view/all-products"
    },
    {
        id:"adminNewProduct",
        label:"Add New Products",
        path:"/admin-view/add-product"
    }
];

export const styles = {
    button : "mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium upprcase tracking-wide text-white"
};

export const registerFormControl = [
    {
        id: 'name',
        type : 'text',
        placeholder:'Enter your name',
        label : 'Name',
        componentType : 'input'
    },
    {
        id: 'email',
        type : 'email',
        placeholder:'Enter your email',
        label : 'Email',
        componentType : 'input'
    },
    {
        id: 'password',
        type : 'password',
        placeholder:'Enter your password',
        label : 'Password',
        componentType : 'input'
    },
    {
        id: 'role',
        type : '',
        placeholder:'',
        label : 'Role',
        componentType : 'select',
        options : [
            {
                id:'admin',
                label:'Admin'
            },
            {
                id:'customer',
                label:'Customer'
            }
        ]
    }
];

export const loginFormControl = [
    {
        id: 'email',
        type : 'email',
        placeholder:'Enter your email',
        label : 'Email',
        componentType : 'input'
    },
    {
        id: 'password',
        type : 'password',
        placeholder:'Enter your password',
        label : 'Password',
        componentType : 'input'
    }
];

export const adminAddProductformControls = [
    {
      id: "name",
      type: "text",
      placeholder: "Enter name",
      label: "Name",
      componentType: "input",
    },
    {
      id: "price",
      type: "number",
      placeholder: "Enter price",
      label: "Price",
      componentType: "input",
    },
    {
      id: "description",
      type: "text",
      placeholder: "Enter description",
      label: "Description",
      componentType: "input",
    },
    {
      id: "category",
      type: "",
      placeholder: "",
      label: "Category",
      componentType: "select",
      options: [
        {
          id: "men",
          label: "Men",
        },
        {
          id: "women",
          label: "Women",
        },
        {
          id: "kids",
          label: "Kids",
        },
      ],
    },
    {
      id: "deliveryInfo",
      type: "text",
      placeholder: "Enter deliveryInfo",
      label: "Delivery Info",
      componentType: "input",
    },
    {
      id: "onSale",
      type: "",
      placeholder: "",
      label: "On Sale",
      componentType: "select",
      options: [
        {
          id: "yes",
          label: "Yes",
        },
        {
          id: "no",
          label: "No",
        },
      ],
    },
    {
      id: "priceDrop",
      type: "number",
      placeholder: "Enter Price Drop",
      label: "Price Drop",
      componentType: "input",
    },
  ];

  export const AvailableSizes = [
    {
      id: "s",
      label: "S",
    },
    {
      id: "m",
      label: "M",
    },
    {
      id: "l",
      label: "L",
    },
  ];

  export const firebaseConfig = {
    apiKey: "AIzaSyBTcvZ--nX69yAhebeblSRIAQk6sIhpTjc",
    authDomain: "learning-ec-2.firebaseapp.com",
    projectId: "learning-ec-2",
    storageBucket: "learning-ec-2.appspot.com",
    messagingSenderId: "664628986378",
    appId: "1:664628986378:web:e489fc2a331b021ce095f3",
    measurementId: "G-RDHGC6PX0Y"
  };

  export const fireBaseStore = 'gs://learning-ec-2.appspot.com'