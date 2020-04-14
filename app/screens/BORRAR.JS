useEffect(() => {
  (async () => {
    const user = await firebase.auth().currentUser;
    setUserInfo(user.providerData[0]);
  })();
  setReloadData(false);
}, [reloadData]);

useEffect(() => {
  (async () => {
    const user = await firebase.auth().currentUser.uid;
    await db
      .collection("centers")
      .doc(`${user}`)
      .get()
      .then((doc) => {
        setCenterInfo(doc.data());
      });
  })();
}, []);

{
  return (
    <View
      style={{
        flex: 1,
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowRadius: 2,
        shadowOpacity: 1,
      }}
    >
      <Image
        source={require("../../assets/img/profile-bg.png")}
        style={{
          height: 200,
          resizeMode: "center",
          width: "100%",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Avatar
            rounded
            size="xlarge"
            containerStyle={{ marginTop: 10, marginBottom: 10 }}
            source={{ uri: userInfo.photoURL }}
          />
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#6b7a8f" }}>
            {userInfo.displayName}
          </Text>
        </View>
      </Image>
      <Card containerStyle={{ borderRadius: 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Text
            style={styles.textMenu}
            onPress={() => {
              setRenderDetails(true), setRenderDogsCenter(false);
            }}
          >
            DETAILS
          </Text>
          <Text style={{ color: "#f7882f" }}>|</Text>
          <Text
            style={styles.textMenu}
            onPress={() => {
              setRenderDetails(false), setRenderDogsCenter(true);
            }}
          >
            CATALOG
          </Text>
          <Text style={{ color: "#f7882f" }}>|</Text>
          <Text style={styles.textMenu}>CONTACT</Text>
        </View>
      </Card>
      {renderDetails && (
        <DetailsCenter centerInfo={centerInfo} setReloadData={setReloadData} />
      )}
      {renderDogsCenter && <DogsCenter toastRef={toastRef} />}
      <Toast ref={toastRef} position="bottom" opacity={0.5} />
    </View>
  );
}
