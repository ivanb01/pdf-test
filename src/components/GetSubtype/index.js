import { getContactCategories } from '@api/contacts';
import { setVendorSubtypes } from '@store/global/slice';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const GetSubtype = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getContactCategories().then((result) => {
      console.log(result.data.data.filter((item) => item.category == 'Professional' && ![8, 12, 9].includes(item.id)));
      dispatch(
        setVendorSubtypes(
          result.data.data
            .filter((item) => item.category == 'Professional' && ![8, 12, 9].includes(item.id))
            .map((item) => {
              return { id: item.id, name: item.name };
            }),
        ),
      );
    });
  }, []);
};

export default GetSubtype;
