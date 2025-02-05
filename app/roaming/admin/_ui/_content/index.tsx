import { useState } from "react";

type Banner = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  status: "active" | "inactive";
};

const Content = () => {
  const [banners, setBanners] = useState<Banner[]>([
    {
      id: "B001",
      title: "Spring Sale",
      description: "Up to 50% off on all items!",
      imageUrl: "https://via.placeholder.com/300",
      status: "active",
    },
    {
      id: "B002",
      title: "New Arrivals",
      description: "Check out our latest collection.",
      imageUrl: "https://via.placeholder.com/300",
      status: "inactive",
    },
  ]);

  const [filter, setFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  // Filtered and searched banners
  const filteredBanners = banners.filter((banner) => {
    const matchesFilter = filter === "All" || banner.status === filter;
    const matchesSearch = banner.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredBanners.length / itemsPerPage);
  const displayedBanners = filteredBanners.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Add or edit banner
  const handleFormSubmit = (banner: Banner) => {
    if (editingBanner) {
      setBanners((prev) => prev.map((b) => (b.id === banner.id ? banner : b)));
    } else {
      setBanners((prev) => [...prev, { ...banner, id: `B${prev.length + 1}` }]);
    }
    setEditingBanner(null);
  };

  // Delete banner
  const deleteBanner = (id: string) => {
    setBanners((prev) => prev.filter((banner) => banner.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Banner Management</h2>

      {/* Filters and Search */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          {["All", "active", "inactive"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded ${
                filter === status
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
          <button
            onClick={() =>
              setEditingBanner({
                id: "",
                title: "",
                description: "",
                imageUrl: "",
                status: "active",
              })
            }
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add New Banner
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by Title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-4 py-2 rounded w-1/3"
        />
      </div>

      {/* Banners Table */}
      <table className="min-w-full table-auto bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Image</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedBanners.map((banner) => (
            <tr key={banner.id}>
              <td className="px-4 py-2 border">{banner.title}</td>
              <td className="px-4 py-2 border">{banner.description}</td>
              <td className="px-4 py-2 border">
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="px-4 py-2 border">
                <span
                  className={`px-2 py-1 rounded text-white ${
                    banner.status === "active" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {banner.status}
                </span>
              </td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => setEditingBanner(banner)}
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteBanner(banner.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Add/Edit Banner Form */}
      {editingBanner !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md lg:w-1/3 w-full">
            <h3 className="text-xl font-bold mb-4">
              {editingBanner ? "Edit Banner" : "Add New Banner"}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleFormSubmit(editingBanner);
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  value={editingBanner?.title || ""}
                  onChange={(e) =>
                    setEditingBanner((prev) =>
                      prev ? { ...prev, title: e.target.value } : null
                    )
                  }
                  className="border px-4 py-2 rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  value={editingBanner?.description || ""}
                  onChange={(e) =>
                    setEditingBanner((prev) =>
                      prev ? { ...prev, description: e.target.value } : null
                    )
                  }
                  className="border px-4 py-2 rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Image URL</label>
                <input
                  type="text"
                  value={editingBanner?.imageUrl || ""}
                  onChange={(e) =>
                    setEditingBanner((prev) =>
                      prev ? { ...prev, imageUrl: e.target.value } : null
                    )
                  }
                  className="border px-4 py-2 rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Status</label>
                <select
                  value={editingBanner?.status || "active"}
                  onChange={(e) =>
                    setEditingBanner((prev) =>
                      prev
                        ? {
                            ...prev,
                            status: e.target.value as "active" | "inactive",
                          }
                        : null
                    )
                  }
                  className="border px-4 py-2 rounded w-full"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingBanner(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => {
                    let newBanners = [...banners];
                    let bannerIds = banners.map((b) => b.id);
                    if (bannerIds.includes(editingBanner.id)) {
                      // Update the existing banner
                      newBanners = newBanners.map((b) =>
                        b.id === editingBanner.id ? editingBanner : b
                      );
                    } else {
                      // Add a new banner
                      newBanners.push({
                        ...editingBanner,
                        id: `B${newBanners.length + 1}`, // Generate a new ID
                      });
                    }
                    setBanners(newBanners);
                    setEditingBanner(null); // Close the form after saving
                  }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;
