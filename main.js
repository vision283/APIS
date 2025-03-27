let allPhotos = []; // Almacenará todas las fotos
let currentPage = 1; // Página actual
const photosPerPage = 10; // Fotos por página

const listPhotos = async () => {
    const response = await fetch("https://picsum.photos/v2/list");
    allPhotos = await response.json();
    renderPhotos(currentPage); // Mostrar la primera página
};

const renderPhotos = (page) => {
    const startIndex = (page - 1) * photosPerPage;
    const endIndex = startIndex + photosPerPage;
    const photos = allPhotos.slice(startIndex, endIndex);

    let gallery = ``;
    photos.forEach((photo) => {
        gallery += `
            <div class="col-md-4 mb-3">
                <div class="card">
                    <img src="${photo.download_url}" class="card-img-top" alt="${photo.author}" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${photo.author}</h5>
                        <p class="card-text">
                            <small class="text-muted">ID: ${photo.id}</small><br>
                            <a href="${photo.url}" target="_blank">Ver en Unsplash</a>
                        </p>
                    </div>
                </div>
            </div>`;
    });
    document.getElementById("Body_photos").innerHTML = gallery;
};

// Eventos para los botones de paginación
document.getElementById("nextPage").addEventListener("click", () => {
    const totalPages = Math.ceil(allPhotos.length / photosPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderPhotos(currentPage);
    }
});

document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderPhotos(currentPage);
    }
});

window.addEventListener("load", function () {
    listPhotos();
});