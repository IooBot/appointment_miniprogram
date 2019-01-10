const serverbyprops = `
  query serverbyprops($name: String) {
    serverbyprops: server_by_props(name: $name) {
      id
      name
      description
      img
      createdAt
      updatedAt
    }
  }
`;

const servicebyprops = `
  query servicebyprops($server_id: ID) {
    servicebyprops: service_by_props(server_id: $server_id) {
      id
      server_id {
        id
        name
        description
        img
        createdAt
        updatedAt
      }
      repertory_id {
        id
        count
        createdAt
        updatedAt
      }
      description
      price
      startTime
      lastTime
    }
  }
`;

const createorderAndupdaterepertory = `
  mutation createorderAndupdaterepertory ($order_id: ID!, $contactTelephone: String, $contactName: String, $payStatus: String, $remark: String, $payCount: String, $payTime: String, $createdAt: String, $orderStatus: String, $user_id: ID, $service_id: ID, $customerNumber: Int, $repertory_id: ID, $updatedAt: String, $count: Int) {
    updaterepertory: update_repertory(id: $repertory_id count: $count updatedAt: $updatedAt) {
      id
      count
      updatedAt
    }

    createorder: create_order(id: $order_id contactTelephone: $contactTelephone contactName: $contactName payStatus: $payStatus remark: $remark payCount: $payCount createdAt: $createdAt updatedAt: $updatedAt payTime: $payTime createdAt: $createdAt orderStatus: $orderStatus user_id: $user_id service_id: $service_id customerNumber: $customerNumber) {
        payStatus
        remark
        payCount
        updatedAt
        payTime
        createdAt
        updatedAt
        orderStatus
        id
        customerNumber
        contactTelephone
        contactName
      }  
    }
`;

const userbyid = `
  query userbyid($id: ID) {
    userbyid: user_by_id(id: $id) {
      id
      openid
      admin
      username
      nickname
      password
      telephone
      email
      createdAt
      updatedAt
    }
  }
`;

const orderbyprops = `
    query orderbyprops($orderStatus: String, $user_id: ID) {
      orderbyprops: order_by_props(orderStatus: $orderStatus user_id: $user_id) {
        payStatus
        remark
        payCount
        updatedAt
        payTime
        createdAt
        orderStatus
        id
        contactTelephone
        contactName
        user_id {
          id
          openid
          admin
          username
          nickname
          password
          telephone
          email
          createdAt
          updatedAt
        }
        service_id {
          id
          description
          price
          startTime
          lastTime
          createdAt
          updatedAt
          repertory_id {
              id
              count
              createdAt
              updatedAt
            }
          server_id {
              id
              name
              description
              createdAt
              updatedAt
           }
        }
        customerNumber
      }
    }
`;

const adminorderbyprops = `
    query adminorderbyprops($orderStatus: String) {
      adminorderbyprops: order_by_props(orderStatus: $orderStatus) {
        payStatus
        remark
        payCount
        updatedAt
        payTime
        createdAt
        orderStatus
        id
        contactTelephone
        contactName
        user_id {
          id
          openid
          admin
          username
          nickname
          password
          telephone
          email
          createdAt
          updatedAt
        }
        service_id {
          id
          description
          price
          startTime
          lastTime
          createdAt
          updatedAt
          repertory_id {
              id
              count
              createdAt
              updatedAt
            }
          server_id {
              id
              name
              description
              createdAt
              updatedAt
           }
        }
        customerNumber
      }
    }
`;

const updateorderAndupdaterepertory = `
    mutation updateorderAndupdaterepertory ($order_id: ID, $repertory_id: ID, $updatedAt: String, $orderStatus: String, $count: Int) {
      updateorder: update_order(id: $order_id updatedAt: $updatedAt orderStatus: $orderStatus) {
        payStatus
        remark
        payCount
        updatedAt
        payTime
        createdAt
        orderStatus
        id
        customerNumber
      }
      
      updaterepertory: update_repertory(id: $repertory_id count: $count updatedAt: $updatedAt) {
        id
        count
        updatedAt
      }
    }
`;

const updateorder = `
    mutation updateorder($updatedAt: String, $orderStatus: String, $id: ID, $user_id: ID) {
      updateorder: update_order(updatedAt: $updatedAt orderStatus: $orderStatus id: $id user_id: $user_id ) {
        payStatus
        remark
        payCount
        updatedAt
        payTime
        createdAt
        orderStatus
        id
        customerNumber
      }
    }
`;

const updateuser = `
    mutation updateuser($id: ID, $nickname: String, $telephone: String, $updatedAt: String) {
      updateuser: update_user(id: $id nickname: $nickname  telephone: $telephone updatedAt: $updatedAt) {
        id
        openid
        admin
        username
        nickname
        password
        telephone
        email
        createdAt
        updatedAt
      }
    }
`;

const createserver = `
    mutation createserver($id: ID!, $name: String, $description: String, $img: String, $createdAt: String, $updatedAt: String) {
      createserver: create_server(id: $id name: $name description: $description img: $img createdAt: $createdAt updatedAt: $updatedAt) {
        id
        name
        description
        img
        createdAt
        updatedAt
      }
    }
`;

const updateserviceAndupdaterepertory = `
    mutation createserviceAndcreaterepertory($service_id: ID, $server_id: ID, $repertory_id: ID!, $count: Int, $description: String, $price: Float, $startTime: String, $lastTime: String, $updatedAt: String) {
      updateservice: update_service(id: $service_id server_id: $server_id repertory_id: $repertory_id description: $description price: $price startTime: $startTime lastTime: $lastTime updatedAt: $updatedAt) {
        id
        description
        price
        startTime
        lastTime
        createdAt
        updatedAt
      }
      
      updaterepertory: update_repertory(id: $repertory_id service_id: $service_id count: $count updatedAt: $updatedAt) {
        id
        count
        createdAt
        updatedAt
      }
    }
`;

const createserviceAndcreaterepertory = `
    mutation createserviceAndcreaterepertory($service_id: ID!, $server_id: ID, $repertory_id: ID!, $count: Int, $description: String, $price: Float, $startTime: String, $lastTime: String, $createdAt: String, $updatedAt: String) {
      createservice: create_service(id: $service_id server_id: $server_id repertory_id: $repertory_id description: $description price: $price startTime: $startTime lastTime: $lastTime createdAt: $createdAt updatedAt: $updatedAt) {
        id
        description
        price
        startTime
        lastTime
        createdAt
        updatedAt
      }
      
      createrepertory: create_repertory(id: $repertory_id service_id: $service_id count: $count createdAt: $createdAt updatedAt: $updatedAt) {
        id
        count
        createdAt
        updatedAt
      }
    }
`;

module.exports = {
    serverbyprops: serverbyprops,
    servicebyprops: servicebyprops,
    createorderAndupdaterepertory: createorderAndupdaterepertory,
    userbyid: userbyid,
    orderbyprops: orderbyprops,
    adminorderbyprops: adminorderbyprops,
    updateorderAndupdaterepertory: updateorderAndupdaterepertory,
    updateorder: updateorder,
    updateuser: updateuser,
    createserver: createserver,
    updateserviceAndupdaterepertory: updateserviceAndupdaterepertory,
    createserviceAndcreaterepertory: createserviceAndcreaterepertory
};
