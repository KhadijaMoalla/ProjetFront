export const loadIfcUrl = async (viewer: any, file: File) => {
  if (!viewer || !viewer.IFC) {
    console.error("❌ Viewer IFC non initialisé");
    return;
  }

  const url = URL.createObjectURL(file);

  try {
    console.log("🔄 Chargement du fichier IFC :", file.name);
    await viewer.IFC.loadIfcUrl(url);
    console.log("✅ Chargement réussi !");
  } catch (error: unknown) {
    const err = error as Error;
    console.error("❌ Erreur lors du chargement du fichier IFC :", err);
    alert("Erreur de chargement IFC : " + (err.message || err));
  }
  
};
