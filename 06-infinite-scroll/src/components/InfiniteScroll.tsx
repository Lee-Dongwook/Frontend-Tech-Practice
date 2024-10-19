"use client";
import { useEffect, useRef, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchMoreData = async ({ pageParam = 0 }: { pageParam?: number }) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${
      pageParam + 1
    }&_limit=10`
  );

  const data = await res.json();
  return { data, nextCursor: data.length ? pageParam + 1 : undefined };
};

const InfiniteScroll = () => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchMoreData,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, fetchNextPage]
  );

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleObserver, {
      rootMargin: "20px",
    });

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [handleObserver]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Infinite Scroll</h1>
      <ul className="space-y-4">
        {data?.pages.map((page, pageIndex) =>
          (page as any).data.map((item: any) => (
            <li
              key={item.id + pageIndex}
              className="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-sm transition-shadow duration-200"
            >
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-600">{item.body}</p>
            </li>
          ))
        )}
      </ul>
      <div ref={loadMoreRef} className="h-5 bg-transparent" />
      {isFetchingNextPage && (
        <p className="text-center text-gray-500 mt-4">Loading...</p>
      )}
      {error && (
        <p className="text-center text-red-500 mt-4">
          Error fetching data : {error.message}
        </p>
      )}
      {isFetching && !isFetchingNextPage && (
        <p className="text-center text-gray-500 mt-4">Fetching...</p>
      )}
    </div>
  );
};

export default InfiniteScroll;
