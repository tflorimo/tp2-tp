class DolarService {
    /**
     * @param dolarType: "oficial"|"blue"
     */
    getCurrentDolarPrice = async (dolarType) => {
        if(dolarType!=="blue" && dolarType!=="oficial"){
            console.error("Tipo de dolar no soportado, ingresar \"blue\" u \"oficial\"");
            return;
        }
        try {
            var response = await fetch(`https://dolarapi.com/v1/dolares/${dolarType}`)
            if (response.status == 200) {
                var result = await response.json();
                return result.venta;
            }
        } catch (err) {
            console.error(err);
        }
    }
}

export default DolarService;