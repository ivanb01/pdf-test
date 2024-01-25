import { useEffect, useState } from 'react';
import axiosInstance from '@api/axiosInstance';
import { useDispatch } from 'react-redux';
import { setAIUnApprovedContacts, setTotal } from '@store/AIUnapproved/slice';

function loadItems(offset) {
  return axiosInstance
    .get('v1/contacts?ai_approved=false', {
      params: {
        limit: 15,
        offset: offset,
      },
    })
    .then((response) => {
      return {
        hasNextPage: true,
        data: response.data.data,
        count: response.data.count,
        total: response.data.total,
        fistTimeLoad: true,
      };
    })
    .catch((error) => {
      console.error('Error loading items:', error);
      throw error;
    });
}

export function useLoadItems() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [error, setError] = useState();
  const [offset, setOffset] = useState(0);
  const dispatch = useDispatch();
  const [isInitiallyLoaded, setIsInitiallyLoaded] = useState(true);
  const [totalNumber, setTotalNumber] = useState();

  useEffect(() => {
    dispatch(setAIUnApprovedContacts([...items]));
  }, [items]);

  async function loadMore() {
    setLoading(true);
    try {
      const { data, count, total, hasNextPage: newHasNextPage } = await loadItems(offset);
      setTotalNumber(total);
      dispatch(setTotal(total));
      setItems((current) => [...current, ...data]);
      setOffset((prevOffset) => prevOffset + count);
      setHasNextPage(newHasNextPage);
      if (data.length === 0) {
        setIsInitiallyLoaded(false);
      }
      if (offset + count === total) {
        setHasNextPage(false);
        return;
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return { loading, items, hasNextPage, error, loadMore, totalNumber, isInitiallyLoaded };
}

export default useLoadItems;
