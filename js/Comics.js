const VisComic = async (pagina) => {
    try {
      const url = "http://localhost:8080/comic/buscar";
      const api = await fetch(url);
      const data = await api.json();
      console.log(data);
  
      const divRes = document.querySelector("#resultado");
  
      if (Array.isArray(data)) {
        data.forEach((comic) => {
          const { idComic, tituloComic, descripcionComic, numeroComic, rutaImagen } = comic;
  
          const divItem = document.createElement('div');
          divItem.innerHTML = `
          <div class="card" style="width: 18rem;margin: 10px; ">
            <img src="${rutaImagen}" class="card-img-top border border-2" style="width: 100%; object-fit: cover; object-position: right bottom; clip-path: polygon(0% 0%, 100% 0%, 100% 85%, 0% 100%);" alt="...">
            <div class="card-body text-center" >
              <h5 class="card-title" style="display: flex; justify-content: center; align-items: center;font-family: GretaSansCondensedS;margin: 25px;"><b>${tituloComic}</b></h5>
              <p class="card-text" style=" font-size: 13px;margin: 10px;">${descripcionComic}</p>
              <div style="display: flex; justify-content: center; align-items: center;"> 
                <a class="btn btn-primary" href="..." style="border: 2px solid black; background-color: white; color: black; font-family: calibri; border-radius: 10px;margin: 10px;">Leelo</a>
              </div>
            </div>
          </div>`;
  

          
          divRes.appendChild(divItem);
        });
      } else {
        console.error('Los datos recibidos no tienen el formato esperado.');
      }
    } catch (error) {
      console.error('Ocurrió un error al obtener los datos:', error);
    }
  };

  VisComic(1)

  