const React = require('react');
const ReactDom = require('react-dom/server');
const { Email, Item, Span, A, renderEmail, Box, Image } = require ('react-html-email');
const { ORGANIZATION_NAME, ORGANIZATION_URL } = process.env;
const spanStyles = {
  fontSize: 16,
  fontWeight: 'bold',
}
const pStyle = {
  width: 317,
  height: 25,
  fontSize: 20,
  lineHeight: 1.25,
  textAlign: 'center',
  color: '#101a21',
}
const mailStyle = {
  width: 586,
  height: 347,
  fontSize: 16,
  lineHeight: 25,
  color: '#203340',
}

const CommentLiked = (props) => {
  return (

    <Email>
      <Box align="center" style={{width: 700, height: 136, border: 'solid 1px #e9e9e9'}}>
            <Item align="center" style={{border: 'solid 1px #e9e9e9'}}>
              <Image src='https://www.hcdn.gob.ar/system/modules/ar.gob.hcdn.frontend/resources/img/logo-hcdn-vertical.jpg' align="center" style={{width: 130, height: 98, margin: 25}} />
            </Item>

            <Item align="center" style={{display: "block", marginTop: 25, marginLeft: 191, marginRight: 191}}>
              <Span {...pStyle}>Elaboración de <Span style={{fontWeight: 'bold', fontSize: 20}}>Propuestas de Ley</Span></Span>
            </Item>

              <Item style={{display: "block", marginTop: 25, margin: 57}}>
                  <Span {...spanStyles}>
                  Hola {props.author},
                  </Span>
                  <Box style={{marginTop: 30}}>
                    <Item>
                      <Span {...mailStyle}>- El/la diputado/a xxxxx apoyó el comentario que realizó en la propuesta de ley regulación de contaminación sonora en propuestasabiertas.hcdn.gob.ar (link). Ingrese en <A href="{process.env.ORGANIZATION_URL}">{process.env.ORGANIZATION_NAME}</A>para conocer y comentar en otros proyectos.</Span>
                    </Item>
                  </Box>
                  <Box style={{marginTop: 20}}>
                    <Item>
                      <Span {...mailStyle}> Este fue tu comentario marcado como:</Span>
                    </Item>
                  </Box>
              </Item>

              <Box align="center" style={{border: 'solid 1px #dae1e7', width: 585, height:130, marginLeft: 56}}>
                <Item>
                        <Box style={{width: 50, height: 140, backgroundColor: '#f2f5f8'}}>
                          <Item>
                            <Box style={{marginBottom: 91, marginLeft: 14}}>
                              <Item>
                                <Image src="https://complejoteatral.blob.core.windows.net/assets/like.png" style={{width: 24.7, height: 24.7}}/>
                              </Item>
                            </Box>
                          </Item>
                        </Box>
                        <Box style={{marginLeft: 28, marginTop: 16}}>
                          <Item>
                            <Image style={{borderRadius: 50}} src="https://picsum.photos/30/30" />
                          </Item>
                        </Box>
                        <Box align="center" style={{marginLeft: 121, marginTop: 16}}>
                          <Item >
                            <Span>{props.participant.name}</Span>
                          </Item>
                          <Item>
                            <Span>Occupation</Span>
                          </Item>
                        </Box>
                        <Box align="center" style={{marginLeft: 80, marginTop: 20, marginBottom: 22}}>
                          <Item>
                            <Span style={{fontSize: 14}}>{props.comment}</Span>
                          </Item>
                        </Box>
                </Item>
              </Box>

              <Box align="center" style={{width: 700, height: 126, marginTop: 49, borderBottom: 'solid 1px #e9e9e9', backgroundColor: '#5c98bd'}}>
                <Item>
                  <Box align="center">
                    <Item align="center" style={{width: 535, height: 40, margin: 82}}>
                      <Span style={{color: 'white', fontSize: 13}}>Honorable Cámara de Diputados de la Nación Argentina | Congreso de la Nación Argentina | Av. Rivadavia 1864 - Ciudad Autónoma de Bs. As. (C.P.C1033AAV) | (54-11) 4127-7100</Span>
                    </Item>
                  </Box>
                </Item>
              </Box>
      </Box>
    </Email>
  );
}

module.exports = (props) => renderEmail(<CommentLiked {...props}/>);
